'use client';
import React, { useState } from "react";
import styles from "./index.module.sass";


export const StrpsContact = ({ disabled }: { disabled: boolean }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <section className={styles.contact}>
            <div className={styles.content}>
                {/* <Image className={styles.logo} src={logo} alt="logo" /> */}
                <div>
                    <h2>Contact</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                disabled={disabled}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                disabled={disabled}
                                onChange={(e) => setEmail(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                value={message}
                                disabled={disabled}
                                onChange={(e) => setMessage(e.target.value)
                                }
                            ></textarea>
                        </div>
                        <button type="submit" disabled={disabled}>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
};
