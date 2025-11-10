import type { Blog } from "./BlogCard";

export default function Weekly({ blogs }: { blogs: Blog[] }) {
  const weekDaysCount = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };
  for (let blog of blogs) {
    const day = new Date(blog.date).getDay();
    switch (day) {
      case 0:
        weekDaysCount.Sunday++;
        break;
      case 1:
        weekDaysCount.Monday++;
        break;
      case 2:
        weekDaysCount.Tuesday++;
        break;
      case 3:
        weekDaysCount.Wednesday++;
        break;
      case 4:
        weekDaysCount.Thursday++;
        break;
      case 5:
        weekDaysCount.Friday++;
        break;
      case 6:
        weekDaysCount.Saturday++;
        break;
    }
  }
  return (
    <div className="p-3 bg-gray-200 rounded-2xl shadow-md">
      {Object.entries(weekDaysCount).map(([day, count]) => (
        <p key={day} className="flex flex-nowrap">
          {day} | {count}
        </p>
      ))}
    </div>
  );
}
