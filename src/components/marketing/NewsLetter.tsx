"use client"
import React, { useState } from 'react';
import NewsletterForm from '../ui/NewsletterForm';



const NewsLetter = ({id}:{id:string}) => {
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
    <section id={id} className="text-left sm:text-center  mt-10">
    <h1 className="text-[30px] md:text-[60px] font-[700] mb-4 leading-tight">
      Subscribe to our Newsletter
    </h1>
    <p className="text-[18px] md:text-[20px] font-[400] text-white  mx-auto mb-8">
    Stay updated with exclusive MDC Coin insights and exciting crypto OTT news—subscribe now!
    </p>
    <NewsletterForm />
  </section>

  );
};

export default NewsLetter;