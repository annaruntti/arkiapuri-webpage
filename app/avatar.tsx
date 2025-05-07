import ContentfulImage from "@/lib/contentful-image";

export default function Avatar({
  name,
  profilePicture,
}: {
  name: string;
  profilePicture: any;
}) {
  return (
    <div className="flex items-center">
      <div className="mr-4 w-12 h-12">
        <ContentfulImage
          alt={name}
          className="object-cover h-full rounded-full"
          height={48}
          width={48}
          src={profilePicture.url}
        />
      </div>
      <div className="text-xl font-semibold">{name}</div>
    </div>
  );
}
