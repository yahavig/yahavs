import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center py-32">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="text-6xl font-bold text-[var(--color-text-primary)]">404</p>
          <h1 className="mt-4 text-2xl font-bold text-[var(--color-text-primary)]">
            העמוד לא נמצא
          </h1>
          <p className="mt-3 text-base text-[var(--color-text-secondary)]">
            נראה שהעמוד שחיפשתם לא קיים. אולי הלינק השתנה?
          </p>
          <div className="mt-8">
            <Button href="/">חזרה לדף הבית</Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
