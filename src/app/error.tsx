'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col max-w-xl p-8 mx-auto my-4 bg-white border rounded-lg border-neutral-200 dark:border-neutral-800 dark:bg-black md:p-12">
      <h2 className="text-xl font-bold">Ah não!</h2>
      <p className="my-2">
        Houve um problema com nossa loja. Este pode ser um problema temporário. Tente o seu
        ação novamente.
      </p>
      <button
        className="flex items-center justify-center w-full p-4 mx-auto mt-4 tracking-wide text-white bg-blue-600 rounded-full hover:opacity-90"
        onClick={() => reset()}
      >
        Tente Novamente
      </button>
    </div>
  );
}