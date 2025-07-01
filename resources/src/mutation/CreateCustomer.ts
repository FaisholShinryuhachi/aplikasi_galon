import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
    mutation CreateCustomer($name: String!, $phone: String!) {
        createCustomer(name: $name, phone: $phone) {
            name
            phone
        }
    }
`;
