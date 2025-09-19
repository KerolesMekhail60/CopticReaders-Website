import { Link } from 'react-router-dom';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      to={`/`}
      className={className}
    >
      <img
        src='/public/svg/Logo.svg'
        className='size-14'
      />
    </Link>
  );
};

export default Logo;
