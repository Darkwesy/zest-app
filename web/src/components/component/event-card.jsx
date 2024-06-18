/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import { formatBrDate } from '@/utils/formatBrDate';

export function EventCard({
  title,
  date,
  details,
  location,
  eventLink,
  maxParticipants,
  buttonText,
  onClick,
  onDelete,
  category,
  deleteButton,
}) {
  console.log(eventLink);
  return (
    <Card className="w-full h-full max-w-sm">
      <a className="group block overflow-hidden rounded-lg" href="#">
        <img
          alt="Event Thumbnail"
          className="h-52 w-full object-cover transition-all duration-300 group-hover:scale-125"
          height="200"
          src="/placeholder.svg"
          style={{
            aspectRatio: '400/200',
            objectFit: 'cover',
          }}
          width="400"
        />
      </a>
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-col">
          <div className="space-y-2 self-start">
            <a className="font-semibold text-lg hover:underline cursor-pointer" target="_blank" href={eventLink}>
              {title}
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatBrDate(date)} - {location}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{details}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Máximo de participantes: {maxParticipants}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Categoria: {category}</p>
          </div>
          <div className={`flex gap-2 mt-4 ${deleteButton ? 'self-end' : 'self-end'}`}>
            <Button size="sm" variant="outline" onClick={onClick}>
              <a href={eventLink}>{buttonText}</a>
            </Button>
            {deleteButton ? (
              <Button size="sm" variant="destructive" onClick={onDelete}>
                Deletar
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
