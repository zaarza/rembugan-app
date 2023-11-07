import userType from '@/type/userType';

type contactType = {
  id: string;
  user_id: string;
  added_by: string;
  added_at: number;
  details: userType;
}

export default contactType