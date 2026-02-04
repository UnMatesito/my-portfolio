import { createTheme, ThemeProvider } from "flowbite-react";

const gtTheme = createTheme({
  button: {
    color: {
      primary:
        "bg-white hover:bg-amber-400 border border-zinc-400 btn-pulse-amber",
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={gtTheme}>
            {children}
        </ThemeProvider>
    );
};
