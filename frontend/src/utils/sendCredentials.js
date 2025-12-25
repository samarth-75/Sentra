import emailjs from "emailjs-com";

export const sendCredentials = (user) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};