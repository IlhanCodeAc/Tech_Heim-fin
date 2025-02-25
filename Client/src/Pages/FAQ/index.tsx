import React, { useState } from 'react';
import style from "./style.module.css";
import Background from "../../assets/Images/7c10ce9c6bec9dfb1d180644d83ea12b.jpg";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I purchase products from Tech Heim using installment payments?",
      answer: "Yes, Tech Heim offers the option to purchase products using both cash and installment payments. This allows you to choose the payment method that suits your needs and budget."
    },
    {
      question: "How can I engage with the magazine content on Tech Heim?",
      answer: "You can actively engage with the magazine content by leaving comments and participating in the question-and-answer section. Feel free to share your thoughts, ask questions, and interact with fellow tech enthusiasts in the community."
    },
    {
      question: "Does Tech Heim offer a warranty on its products?",
      answer: "Yes, Tech Heim provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information."
    },
    {
      question: "Is Tech Heim a secure platform for online shopping?",
      answer: "Yes, Tech Heim provides a secure platform with encryption and secure payment gateways to ensure customer data protection."
    }
  ];

  return (
    <div className='container'>
      <div className={style.FaqTop}>
        <img src={Background} alt="FAQ Background" />
        <h3>Frequently Asked Questions</h3>
      </div>
      <div className={style.Questions}>
        {faqs.map((faq, index) => (
          <div key={index} className={style.Question}>
            <div className={style.QuestionHeader} onClick={() => toggleQuestion(index)}>
              <h2>{faq.question} {openIndex === index ? <ChevronUp /> : <ChevronDown />}</h2>
            </div>
            {openIndex === index && <p>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
