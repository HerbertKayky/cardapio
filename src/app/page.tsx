import Container from "@/components/Container";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Dashboard />
      </Container>
    </>
  );
}
