import userType from '@/type/userType';

type inboxType = {
  id: string;
  type: 'friend' | 'group' | 'group-join-request';
  sender_id: string;
  receiver_id: string;
  created_at: number;
  updated_at: number;
  sender_details: userType
}

export default inboxType;