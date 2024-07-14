import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default MyApp;
