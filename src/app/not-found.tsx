import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl text-[#f5f2ea] sm:text-6xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-[#c7c0b5]">
        The page you are looking for is unavailable or has not been created yet.
      </p>
      <div className="mt-8">
        <Button href="/">Back home</Button>
      </div>
    </Container>
  );
}
