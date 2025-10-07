import Razorpay from 'razorpay';

export const razorpay_key_id =
  import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_RFVWgJ83gYZWSZ';
export const razorpay_key_secret =
  import.meta.env.VITE_RAZORPAY_KEY_SECRET || '0xECBO40bvtC3EKijcMl6OwM';

const razorpay = new Razorpay({
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret,
});

export default razorpay;
