interface IconProps {
  color?: string
  className?: string
}

export function SingleCheck({ color = '#444444', className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.52861 7.5286C3.78895 7.26825 4.21107 7.26825 4.47141 7.5286L7.13808 10.1953C7.39843 10.4556 7.39843 10.8777 7.13808 11.1381C6.87773 11.3984 6.45562 11.3984 6.19527 11.1381L3.52861 8.47141C3.26826 8.21106 3.26826 7.78895 3.52861 7.5286Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4714 4.86193C12.7318 5.12228 12.7318 5.54439 12.4714 5.80474L7.13807 11.1381C6.87772 11.3984 6.45561 11.3984 6.19526 11.1381C5.93491 10.8777 5.93491 10.4556 6.19526 10.1953L11.5286 4.86193C11.7889 4.60158 12.2111 4.60158 12.4714 4.86193Z"
        fill={color}
      />
    </svg>
  )
}
