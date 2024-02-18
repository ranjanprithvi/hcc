interface Props {
    children: JSX.Element;
}

const ProtectedComponent = ({ children }: Props) => {
    return children;
};

export default ProtectedComponent;
