import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Test from "~/components/test";

export default component$(() => {
  const show = useSignal<boolean>(false);

  return (
    <>
      <button
        style={"width:50px;height:50px;background-color:green;"}
        onClick$={() => {
          show.value = true;
        }}
      >
        Open
      </button>
      <Test show={show.value}></Test>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
