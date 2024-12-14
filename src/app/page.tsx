import LoginForm from "@/components/forms/LoginForm";

const getData = async () => {
  const user = await fetch("http://localhost:3000/api/users/1");
  const data = await user.json();
  console.log(data);
  return data;
};

export default async function Home() {
  const data = await getData();
  return (
    <div>
      {JSON.stringify(data)}
      <LoginForm />
    </div>
  );
}
