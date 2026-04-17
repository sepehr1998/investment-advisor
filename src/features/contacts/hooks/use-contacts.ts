import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client from '../../../api/graphql-client';
import type {
  GetContactsByParametersQuery,
  ContactParametersInput,
} from '../../../api/generated';

function escapeString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function buildContactsQuery(params: ContactParametersInput): string {
  const fields: string[] = [];

  if (params.name !== undefined) fields.push(`name: "${escapeString(params.name)}"`);
  if (params.contactId !== undefined) fields.push(`contactId: ${params.contactId}`);
  if (params.extId !== undefined) fields.push(`extId: "${escapeString(params.extId)}"`);
  if (params.status !== undefined) fields.push(`status: "${escapeString(params.status)}"`);
  if (params.address !== undefined) fields.push(`address: "${escapeString(params.address)}"`);
  if (params.nationalityCode !== undefined) fields.push(`nationalityCode: "${escapeString(params.nationalityCode)}"`);
  if (params.contactTypeCode !== undefined) fields.push(`contactTypeCode: "${escapeString(params.contactTypeCode)}"`);
  if (params.contactSubTypeCode !== undefined) fields.push(`contactSubTypeCode: "${escapeString(params.contactSubTypeCode)}"`);
  if (params.identityCode !== undefined) fields.push(`identityCode: "${escapeString(params.identityCode)}"`);
  if (params.classificationCode !== undefined) fields.push(`classificationCode: "${escapeString(params.classificationCode)}"`);
  if (params.classificationCode2 !== undefined) fields.push(`classificationCode2: "${escapeString(params.classificationCode2)}"`);
  if (params.classificationCode3 !== undefined) fields.push(`classificationCode3: "${escapeString(params.classificationCode3)}"`);
  if (params.postcode !== undefined) fields.push(`postcode: "${escapeString(params.postcode)}"`);
  if (params.languageCode !== undefined) fields.push(`languageCode: "${escapeString(params.languageCode)}"`);
  if (params.portfolioIds !== undefined && params.portfolioIds.length > 0) {
    fields.push(`portfolioIds: [${params.portfolioIds.join(', ')}]`);
  }
  if (params.juridicalCode !== undefined) fields.push(`juridicalCode: "${escapeString(params.juridicalCode)}"`);
  if (params.city !== undefined) fields.push(`city: "${escapeString(params.city)}"`);
  if (params.lastModifiedStartDate !== undefined) fields.push(`lastModifiedStartDate: "${escapeString(params.lastModifiedStartDate)}"`);
  if (params.lastModifiedEndDate !== undefined) fields.push(`lastModifiedEndDate: "${escapeString(params.lastModifiedEndDate)}"`);
  if (params.tags !== undefined && params.tags.length > 0) {
    const tagList = params.tags.map((t) => `"${escapeString(t)}"`).join(', ');
    fields.push(`tags: [${tagList}]`);
  }
  if (params.resultSize !== undefined) fields.push(`resultSize: ${params.resultSize}`);

  // When no filters provided, use the flag that permits unfiltered queries
  if (fields.length === 0) fields.push('enableFilteringWithoutParameters: true');

  const parametersArg = `parameters: { ${fields.join(', ')} }`;

  return gql`
    query GetContactsByParameters {
      contactsByParameters(${parametersArg}) {
        id
        name
        address {
          email
        }
      }
    }
  `;
}

export function useContacts(parameters: ContactParametersInput = {}) {
  const mergedParameters = { resultSize: 500, ...parameters };
  return useQuery({
    queryKey: ['contacts', mergedParameters],
    queryFn: async () => {
      const query = buildContactsQuery(mergedParameters);
      const data = await client.request<GetContactsByParametersQuery>(query);
      return data.contactsByParameters;
    },
    placeholderData: keepPreviousData,
  });
}
