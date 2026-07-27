import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/gr7/Landing";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "GR7 Company — Marketing que transforma empresas em referências" },
      {
        name: "description",
        content:
          "Agência de marketing estratégico. Posicionamento, tráfego pago, criativo e vendas para marcas que querem dominar o mercado.",
      },
      { property: "og:title", content: "GR7 Company — Marketing de alta performance" },
      {
        property: "og:description",
        content:
          "Não criamos apenas posts. Construímos posicionamentos, aumentamos vendas e transformamos marcas em negócios que dominam o mercado.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "GR7 Company" },
      {
        name: "twitter:description",
        content: "Marketing estratégico de alta performance.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GR7 Company",
          description:
            "Agência de marketing estratégico focada em posicionamento, tráfego pago e vendas.",
          url: "/",
        }),
      },
    ],
  }),
});
