"use client"
import React, { useState } from 'react';
import NewsletterForm from '../ui/NewsletterForm';

interface NewsletterProps {
  // Optional props for customization
}

const NewsLetter: React.FC<NewsletterProps> = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Replace with your actual newsletter subscription logic
    try {
      // ... send email to backend or API
      console.log(`Submitting email: ${email}`);
      // ... Handle success or error
    } catch (error) {
      console.error('Error submitting email:', error);
      // ... Handle error
    }
  };

  return (
    <section className="text-left sm:text-center  mt-10">
    <h1 className="text-[40px] md:text-[64px] font-[700] mb-4 leading-tight">
      Subscribe to our Newsletter
    </h1>
    <p className="text-[18px] md:text-[24px] font-[400] text-white max-w-[1100px] mx-auto mb-8">
      Stay updated with the latest AizuCoin insights, blockchain innovations, and exclusive
      crypto news—subscribe now!
    </p>
    <NewsletterForm />
  </section>

  );
};

export default NewsLetter;