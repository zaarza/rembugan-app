import userType from '@/type/userType';
type inboxType = {
  id: string;
  type: 'friend' | 'group';
  sender_id: string;
  receiver_id: string;
  content: string;
  is_seen: number;
  created_at: number;
  updated_at: number;
  sender_details: userType
}

export default inboxType;