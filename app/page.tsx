import ServiceCard from "./components/ServiceCard";

export default function Home() {

  const services = [
    {
      title: 'Crop an Image',
      url: 'crop',
    },
    {
      title: 'Generative Fill',
      url: 'gen-fill',
    },
    {
      title: 'Remove Background',
      url: 'remove_bg',
    },
    {
      title: 'Replace Background',
      url: 'replace_bg',
    },
    {
      title: 'Remove an Object',
      url: 'remove_obj',
    },
    {
      title: 'Replace an Object',
      url: 'replace_obj',
    },
    {
      title: 'Enhance an Image',
      url: 'enhance',
    },
  ]

  const cards = services.map((ser, index) => {

    const { title, url } = ser

    return (
      <ServiceCard key={index} title={title} url={url} />
    )
  })

  return (
    <main className="flex justify-center items-center flex-col pb-12">
      <h1 className="font-semibold py-12 text-xl lg:text-3xl transition-all duration-300">Choose a service</h1>
      <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
        {cards}
      </div>
    </main>
  );
}
