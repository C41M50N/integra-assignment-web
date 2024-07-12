import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useModalState } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Head from "next/head";

export default function Home() {

  const newUserModalState = useModalState();
  const editUserModalState = useModalState();
  const deleteUserModalState = useModalState();

  return (
    <>
      <Head>
        <title>Integra Admin Panel</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-b">
        <section className="ml-auto mr-auto max-w-[1200px]">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-4xl font-bold">
              Integra Admin Panel
            </h1>
            <div className="ml-auto mr-14">
              <Button className="gap-2" onClick={() => {
                newUserModalState.set("open");
              }}>
                <IconPlus />
                Add User
              </Button>
            </div>
          </div>
        </section>
      </div>
      <main className="ml-auto mr-auto max-w-[1200px] pb-8 px-6">
        <div>

        </div>
        <Toaster />
      </main>
    </>
  );
}
