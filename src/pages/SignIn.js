import Container from "../components/Container";
import { useState } from "react";
import axios from "axios";
import ListItem from "../components/lists/signin/ListItem";
import { toast } from "react-toastify";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  async function submit() {
    if (username !== "") {
      toast.loading("Loading...");
      const result = await axios(`http://192.168.0.118/api/${username}`);
      if (result.data[0]?.error) {
        console.log(result);
        toast.dismiss();
        toast.error("Username not found", {
          delay: 750,
        });
      } else {
        toast.dismiss();
        toast.success("Success", {
          delay: 750,
        });
        localStorage.setItem("username", username);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  }

  async function createUsername() {
    const result = await axios.post("http://192.168.8.100/api", {
      devicetype: newUsername,
    });

    if (result.data[0]?.error) {
      if (result.data[0].error.description === "link button not pressed") {
        toast.error("Please press the link button on your Hue Bridge");

        return;
      }
      toast.error("An error occured, please try again");
    }

    if (result.data[0]?.success) {
      toast.success("Username has been created successfully");
    }

    localStorage.setItem("username", result.data[0].success.username);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  const steps = [
    {
      title: "Hue Bridge",
      desc: "Make sure your Hue Bridge is on and close by.",
    },
    {
      title: "Create username",
      desc: `Enter a username in the field below, do not submit yet. If you want to add more devices later, it's recommended to include the device name in the username. For example: "laptop john".`,
    },
    {
      title: "Press button",
      desc: `Press the button on your Hue Bridge.`,
    },
    {
      title: "Submit username",
      desc: `When the button has been pressed, submit the username in the field below.`,
    },
  ];

  return (
    <div className="py-6">
      <div className="w-full flex flex-col gap-6 px-4 py-6 shadow-none max-w-3xl transition-all md:shadow-container md:rounded-3xl md:mx-auto md:px-6 md:py-8 md:bg-gradient-to-tr md:from-stone-800/25 md:to-stone-800/50">
        <div className="flex flex-col gap-2">
          <h1 className="text-stone-50 text-3xl font-bold">Sign Up</h1>
          <p className="text-stone-400">Please sign up to continue</p>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-stone-500">
              Already have a username? Sign in here
            </p>
            <Container>
              <input
                className="bg-transparent focus:outline-none flex w-full px-6 h-14"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Container>
          </div>

          <button
            className="shadow-pink bg-pink-300 h-14 w-full rounded-3xl text-stone-900 font-bold"
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            Sign in
          </button>
        </section>
        <section className="mt-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Create profile</h2>
          <ul className="my-4 flex flex-col gap-6">
            {steps.map((step, index) => (
              <ListItem
                key={index}
                title={step.title}
                desc={step.desc}
                index={index}
              />
            ))}
          </ul>
          <Container>
            <input
              type="text"
              className="bg-transparent focus:outline-none flex w-full px-6 h-14 rounded-3xl text-stone-50 font-medium"
              placeholder="New username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </Container>
          <button
            className="shadow-pink bg-pink-300 h-14 w-full rounded-3xl text-stone-900 font-bold"
            onClick={createUsername}
          >
            Submit username
          </button>
        </section>
      </div>
    </div>
  );
}
