import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

interface ModalProps {
  show: boolean;
}

export default component$((props: ModalProps) => {
  const modalRef = useSignal<HTMLDialogElement | undefined>();

  const closeModal = $(() => {
    modalRef.value?.close();
  });

  useTask$((ctx) => {
    ctx.track(() => props.show);

    if (!isBrowser) return;

    ctx.track(() => modalRef.value);

    if (props.show) {
      modalRef.value?.showModal();
      modalRef.value?.addEventListener("close", closeModal);
    }

    ctx.cleanup(() => {
      modalRef.value?.removeEventListener("close", closeModal);
    });
  });

  return (
    <div>
      <dialog ref={modalRef}>
        <div>
          <FirstComponent />
        </div>
      </dialog>
    </div>
  );
});

export const AnotherComponent = component$(() => {
  return <div>Content</div>;
});

export const FirstComponent = component$(() => {
  const showNext = useSignal(false);

  return (
    <form>
      <button
        type="button"
        style={"height:200px; background-color: red;"}
        onClick$={() => {
          showNext.value = true;
        }}
      >
        Click me
      </button>
      {showNext.value && <AnotherComponent></AnotherComponent>}
    </form>
  );
});
