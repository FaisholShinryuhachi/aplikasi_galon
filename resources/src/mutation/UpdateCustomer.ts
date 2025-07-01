import { gql } from "@apollo/client";

export const UPDATE_CUSTOMER = gql`
    mutation UpdateCustomer($id: ID!, $name: String!, $phone: String!) {
        updateCustomer(id: $id, name: $name, phone: $phone) {
            id
            name
            phone
        }
    }
`;
