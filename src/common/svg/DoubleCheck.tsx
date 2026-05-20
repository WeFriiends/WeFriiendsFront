import theme from '../../styles/createTheme'

interface IconProps {
  color?: string
  className?: string
}

export function DoubleCheck({
  color = theme.palette.primary.main,
  className,
}: IconProps) {
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
        d="M1.53284 7.52859C1.79392 7.26824 2.2172 7.26824 2.47828 7.52859L5.15237 10.1953C5.41344 10.4556 5.41344 10.8777 5.15237 11.1381C4.89129 11.3984 4.46801 11.3984 4.20693 11.1381L1.53284 8.4714C1.27177 8.21105 1.27177 7.78894 1.53284 7.52859Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.21253 8.19526C6.4736 7.93491 6.89689 7.93491 7.15796 8.19526L9.16353 10.1953C9.42461 10.4556 9.42461 10.8777 9.16353 11.1381C8.90246 11.3984 8.47917 11.3984 8.2181 11.1381L6.21253 9.13807C5.95146 8.87772 5.95146 8.45561 6.21253 8.19526Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5006 4.86193C10.7616 5.12228 10.7616 5.54439 10.5006 5.80474L5.15238 11.1381C4.89131 11.3984 4.46802 11.3984 4.20694 11.1381C3.94587 10.8777 3.94587 10.4556 4.20694 10.1953L9.55513 4.86193C9.8162 4.60158 10.2395 4.60158 10.5006 4.86193Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5117 4.86193C14.7728 5.12228 14.7728 5.54439 14.5117 5.80474L9.16352 11.1381C8.90244 11.3984 8.47916 11.3984 8.21808 11.1381C7.95701 10.8777 7.95701 10.4556 8.21808 10.1953L13.5663 4.86193C13.8273 4.60158 14.2506 4.60158 14.5117 4.86193Z"
        fill={color}
      />
    </svg>
  )
}
