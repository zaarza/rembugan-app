type userType = {
  id: string,
  name: string,
  email: string,
  description: string,
  status: string,
  avatar: string,
  is_online: 0 | 1,
  last_seen: number,
  joined_at: number,
}

export default userType;