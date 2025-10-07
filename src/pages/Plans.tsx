import React from 'react';
import { razorpay_key_id } from '../utils/razorpay';
import toast from 'react-hot-toast';
import { useUser } from '../redux/hooks/useUser';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    description: 'Perfect for trying out our platform.',
    features: ['1 Resume Parse / Day', 'Basic Matching', 'Community Support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 499,
    description: 'Best for professionals and small teams.',
    features: [
      '50 Resumes / Month',
      'Advanced Matching',
      'Email Support',
      'Access to Reports',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 1999,
    description: 'For large teams with advanced needs.',
    features: [
      'Unlimited Resumes',
      'AI-based Insights',
      'Dedicated Account Manager',
      'Priority Support',
    ],
  },
];

const Plans: React.FC = () => {
  const { name, email } = useUser();
  const navigate = useNavigate();

  const handlePayment = async (plan: Plan) => {
    if (plan.price === 0) {
      toast.success('Free plan activated!');
      navigate('/upload-jd');
      return;
    }

    try {
      // 1. Call FastAPI backend to create an order
      const { data: order } = await apiClient.post('/payment/create-order', {
        amount: plan.price, // in INR
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      // 2. Configure Razorpay checkout
      const options = {
        key: razorpay_key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'HiringNodes',
        description: `${plan.name} Plan`,
        order_id: order.id,
        handler: function (response: any) {
          toast.success(`Payment Successful for ${plan.name} 🎉`);
          console.log('Payment response:', response);
        },
        prefill: {
          name,
          email,
          contact: '9876543210',
        },
        theme: {
          color: '#2563eb',
        },
      };

      console.log('options:', options);

      // 3. Open Razorpay checkout
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('Payment failed:', error.message);
    }
  };

  return (
    <div className='min-h-screen py-16 px-6'>
      <div className='max-w-6xl mx-auto text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-800'>Choose Your Plan</h1>
        <p className='text-gray-600 mt-2'>
          Select the plan that fits your needs and start today.
        </p>
      </div>

      <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className='bg-white/30 backdrop-blur-2xl shadow-md rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl transition'
          >
            <div>
              <h2 className='text-2xl font-semibold text-gray-800'>
                {plan.name}
              </h2>
              <p className='text-gray-500 mt-2'>{plan.description}</p>
              <p className='text-3xl font-bold text-gray-900 mt-4'>
                {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                {plan.price > 0 && (
                  <span className='text-lg text-gray-500'> /month</span>
                )}
              </p>

              <ul className='mt-6 space-y-3 text-left'>
                {plan.features.map((feature, i) => (
                  <li key={i} className='flex items-center gap-2 text-gray-700'>
                    <span className='text-green-600'>✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handlePayment(plan)}
              className='mt-8 w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary-hover cursor-pointer transition'
            >
              {plan.price === 0 ? 'Get Started' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
