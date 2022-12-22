import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function Contact() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            firstName: event.target.firstName.value,
            email: event.target.email.value,
            message: event.target.message.value,
        }

        const jsonData = JSON.stringify(data);

        const response = await fetch('/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        });

        const result = await response.json();
        console.log(result.data);

    }
    return (
        <>
        <Head>
            <title>Contact Us</title>
        </Head>
        <section className="bg-slate-700">
            <div className="container lg:max-w-4xl mx-auto">
                <SiteHeader className="z-10 relative" />
            </div>
        </section>
        <section className="content-area py-8">
            <div className="container mx-auto lg:max-w-4xl">
                <h1 className="text-6xl text-center text-slate-700 relative z-10 py-8">
                    Contact Us
                </h1>
                <form onSubmit={handleSubmit} action="/api/form" method="post" className="contact-form">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="message">Message:</label>
                    <textarea name="message" id="message"></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
            
        </section>
        <SiteFooter />
        </>
    );
}