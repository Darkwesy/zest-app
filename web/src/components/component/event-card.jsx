/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';

export function EventCard({ title, date, details, buttonText, onClick, onDelete, deleteButton }) {
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
        <div className="flex items-center justify-between">
          <div className="space-y-1 self-start">
            <a className="font-semibold text-lg hover:underline" href="#">
              {title}
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(date).toLocaleDateString()}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{details}</p>
          </div>
          <div className={`flex gap-2 ${deleteButton ? 'flex-col' : 'flex-row self-start'}`}>
            <Button size="sm" variant="outline" onClick={onClick}>
              {buttonText}
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
