export const transportConfig = {
  service: 'gmail',
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_PASSWORD
  }
};

export const getMailOptions = ({ email, name, message }) => {
  return {
    from: process.env.CONTACT_EMAIL,
    to: process.env.CONTACT_EMAIL,
    subject: `New message from ${name}`,
    text: message,
    replyTo: email
  };
};
