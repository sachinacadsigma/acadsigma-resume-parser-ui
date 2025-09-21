import Razorpay from 'razorpay';

export const razorpay_key_id = import.meta.env.VITE_RAZORPAY_KEY_ID;
export const razorpay_key_secret = import.meta.env.VITE_RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret,
});

export default razorpay;
