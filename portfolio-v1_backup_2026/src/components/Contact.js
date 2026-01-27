import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [status, setStatus] = useState("");
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailRegex.test(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid) {
            setStatus("Please enter a valid email address.");
            return;
        }

        const form = e.target;
        try {
            const response = await fetch('https://formspree.io/f/xzzvqalb', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });
            if (response.ok) {
                setStatus("Thanks for your submission!");
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus("Oops! There was a problem submitting your form.");
            }
        } catch (error) {
            setStatus("Oops! There was a problem submitting your form.");
        }
    };

    return (
        <section id="three" className="wrapper style3">
            <div className="container">
                <header className="major">
                    <h2>Contact Me</h2>
                    <p>Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="row gtr-uniform">
                        <div className="col-6 col-12-xsmall">
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="col-6 col-12-xsmall">
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={isEmailValid ? '' : 'invalid-input'} />
                            {!isEmailValid && <p className="error-message">Please enter a valid email format.</p>}
                        </div>
                        <div className="col-12">
                            <textarea name="message" placeholder="Message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
                            <ul className="actions">
                                <li><input type="submit" value="Send Message" className="primary" /></li>
                            </ul>
                        </div>
                    </div>
                </form>
                {status && <p className="form-status">{status}</p>}
            </div>
        </section>
    );
};

export default Contact;
