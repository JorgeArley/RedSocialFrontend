export interface Post {
  _id: String;
  title: String;
  content: String;
  likes: Number;
  userId: UserID;
  createdAt: String;
}

export interface UserID {
  _id: String;
  user: String;
}

export interface ApiResp {
  ok: boolean;
  posts: Post[];
  total: number
}

export interface NewPost {
  title: String;
  content: String;
  likes: number;
}
