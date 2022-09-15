import { gql } from 'apollo-server';
import user from './user/user.schema.js';
import acronym from './acronyms/graphql/acronym.schema.js';

const sharedSchema = gql`
    enum UserRole {
        USER
        ADMIN
    }
`;

export default [sharedSchema, user, acronym];
