interface Props {
    children: JSX.Element;
}

const ProtectedAdminComponent = ({ children }: Props) => {
    return children;
};

export default ProtectedAdminComponent;
