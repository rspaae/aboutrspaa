export interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
    topics: string[];
}

export interface CommitActivity {
    repoName: string;
    message: string;
    date: string;
    url: string;
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'rspaae';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {};
if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
}

export async function getRepositories(): Promise<Repository[]> {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
            {
                headers,
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) throw new Error('Failed to fetch repositories');

        const data = await response.json();
        return data
            .filter((repo: any) => !repo.fork)
            .map((repo: any) => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                stargazers_count: repo.stargazers_count,
                language: repo.language,
                updated_at: repo.updated_at,
                topics: repo.topics || [],
            }));
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

export async function getLatestActivity(): Promise<CommitActivity | null> {
    try {
        // Use events API to get the most recent push across all repos
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=5`,
            {
                headers,
                next: { revalidate: 60 } // Revalidate every 60 seconds for "real-time" feel
            }
        );

        if (!response.ok) throw new Error('Failed to fetch activity');

        const events = await response.json();
        const pushEvent = events.find((e: any) => e.type === 'PushEvent');

        if (pushEvent && pushEvent.payload.commits.length > 0) {
            const commit = pushEvent.payload.commits[0];
            const repoName = pushEvent.repo.name.split('/')[1];

            return {
                repoName,
                message: commit.message,
                date: pushEvent.created_at,
                url: `https://github.com/${pushEvent.repo.name}/commit/${commit.sha}`
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        return null;
    }
}
