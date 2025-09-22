// // import { Link } from 'react-router-dom';

// // import { Notification } from '@/types';

// import { cn } from '@/lib/utils';

// type NotificationItemProps = {
//   notification: Notification;
// };

// const NotificationItem = ({
//   notification: { title, description, date, isRead },
// }: NotificationItemProps) => {
//   return (
//     <div className='flex flex-col'>
//       <div
//         className={cn(
//           'flex items-center gap-4 p-4 hover:bg-secondary-50',
//           isRead ? '' : 'bg-primary-50',
//         )}
//       >
//         <p
//           className={cn(
//             'text-3xl font-bold text-primary-500',
//             isRead && 'invisible',
//           )}
//         >
//           &bull;
//         </p>

//         <div className='flex flex-col gap-2'>
//           <p className='text-secondary-400'>
//             <strong className='text-lg font-semibold text-secondary-900'>
//               {title}
//             </strong>
//             {description}
//           </p>
//           <p className='text-sm text-secondary-400'>{date}</p>
//         </div>
//       </div>

//       {/* <Link
//         to={href}
//         className='text-primary-500 transition-colors duration-200 ease-out hover:text-primary-700'
//       >
//         <span>{type === 'invoice' ? 'View Invoices' : 'View Requests'}</span>
//       </Link> */}
//     </div>
//   );
// };

// export default NotificationItem;
