export interface User {
  id: number;
  avatar_url: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}
