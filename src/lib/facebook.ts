import axios from "axios";

const appId = process.env.FB_APP_ID as string;
const appSecret = process.env.FB_APP_SECRET as string;

export type FBUser = {
  id: string;
  email: string;
};

export async function fbGetUser(accessToken: string, userID: string = ''): Promise<FBUser> {
  const qs = [
    'fields=id,email,name,gender,hometown,birthday,picture{height,is_silhouette,url,width}',
    `access_token=${accessToken}`,
  ];
  const res = await axios.get(`https://graph.facebook.com/me?${qs.join('&')}`);
  console.log('resData: ', res.data);
  
  return {
    id: res.data.id,
    email: res.data.email,
  };
}
