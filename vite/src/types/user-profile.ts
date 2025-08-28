type HandleFunction = (i: string, s: string) => Promise<void>;

type ProfileProgress = {
  label: string;
  variant: string;
  value: number;
};

export type UserProfile = {
  id?: string;
  avatar?: string;
  image?: string;
  name?: string;
  role?: string;
  about?: string;
  email?: string;
  work_email?: string;
  personal_email?: string;
  phone?: string;
  work_phone?: string;
  personal_phone?: string;
  birthdayText?: string;
  lastMessage?: string;
  status?: string;
  friends?: number;
  followers?: number;
  contact?: string;
  company?: string;
  location?: string;
  online_status?: string;
  unReadChatCount?: number;
  groups?: Group[];
  time?: string;
  tier?: string;
  Progress?: ProfileProgress;
};

export type Profile = {
  id: string;
  avatar: string;
  name: string;
  time: string;
};

export type PostImage = {
  img: string;
  featured?: boolean;
  title?: string;
};

type Likes = {
  like: boolean;
  value: number;
};

type Group = {
  id: string;
  avatar: string;
  name: string;
};

export type Reply = {
  id: string;
  profile: Profile;
  data: CommentData;
};

export type CommentData = {
  name?: string;
  comment?: string;
  likes?: Likes;
  video?: string;
  replies?: Reply[];
};

type PostData = {
  id?: string;
  content: string;
  images: PostImage[];
  video?: string;
  likes: Likes;
  comments?: Comment[];
};
export type Comment = {
  id: string;
  profile: Profile;
  data?: CommentData;
};

export type PostDataType = { id: string; data: PostData; profile: Profile };

export interface PostProps {
  commentAdd: (s: string, c: Reply) => Promise<void>;
  handleCommentLikes: HandleFunction;
  editPost?: HandleFunction;
  renderPost?: HandleFunction;
  setPosts?: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  handlePostLikes: (s: string) => Promise<void>;
  handleReplayLikes: (postId: string, commentId: string, replayId: string) => Promise<void>;
  post: PostDataType;
  replyAdd: (postId: string, commentId: string, reply: Reply) => Promise<void>;
}
