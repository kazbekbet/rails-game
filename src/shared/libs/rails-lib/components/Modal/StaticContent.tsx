import { TextContent } from '../../styled/dialogs';

interface Props {
  children: string | string[];
}

export function StaticContent({ children }: Props) {
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((text, i) => (
          <TextContent key={i}>{text}</TextContent>
        ))}
      </>
    );
  }

  return <TextContent>{children}</TextContent>;
}
