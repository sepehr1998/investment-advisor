import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client from '../../../api/graphql-client';
import type {
  GetPortfoliosByParametersQuery,
  PortfolioParametersInput,
} from '../../../api/generated';

function escapeString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function buildPortfoliosQuery(params: PortfolioParametersInput): string {
  const fields: string[] = [];

  if (params.ids && params.ids.length > 0) {
    fields.push(`ids: [${params.ids.map((id) => `"${id}"`).join(', ')}]`);
  }
  if (params.name !== undefined) fields.push(`name: "${escapeString(params.name)}"`);
  if (params.extId !== undefined) fields.push(`extId: "${escapeString(params.extId)}"`);
  if (params.status !== undefined) fields.push(`status: "${escapeString(params.status)}"`);
  if (params.typeCode !== undefined) fields.push(`typeCode: "${escapeString(params.typeCode)}"`);
  if (params.currencyCode !== undefined) fields.push(`currencyCode: "${escapeString(params.currencyCode)}"`);
  if (params.ruleSetCode !== undefined) fields.push(`ruleSetCode: "${escapeString(params.ruleSetCode)}"`);
  if (params.modelPortfolioShortName !== undefined) fields.push(`modelPortfolioShortName: "${escapeString(params.modelPortfolioShortName)}"`);
  if (params.languageCode !== undefined) fields.push(`languageCode: "${escapeString(params.languageCode)}"`);
  if (params.juridicalCode !== undefined) fields.push(`juridicalCode: "${escapeString(params.juridicalCode)}"`);
  if (params.countryCode !== undefined) fields.push(`countryCode: "${escapeString(params.countryCode)}"`);
  if (params.valuationMethod !== undefined) fields.push(`valuationMethod: "${escapeString(params.valuationMethod)}"`);
  if (params.custodyCode !== undefined) fields.push(`custodyCode: "${escapeString(params.custodyCode)}"`);
  if (params.bookEntry !== undefined) fields.push(`bookEntry: "${escapeString(params.bookEntry)}"`);
  if (params.lastModifiedStartDate !== undefined) fields.push(`lastModifiedStartDate: "${escapeString(params.lastModifiedStartDate)}"`);
  if (params.lastModifiedEndDate !== undefined) fields.push(`lastModifiedEndDate: "${escapeString(params.lastModifiedEndDate)}"`);
  if (params.tags && params.tags.length > 0) {
    const tagList = params.tags.map((t) => `"${escapeString(t)}"`).join(', ');
    fields.push(`tags: [${tagList}]`);
  }
  if (params.resultSize !== undefined) fields.push(`resultSize: ${params.resultSize}`);

  const parametersArg = fields.length > 0
    ? `parameters: { ${fields.join(', ')} }`
    : `parameters: {}`;

  return gql`
    query GetPortfoliosByParameters {
      portfoliosByParameters(${parametersArg}) {
        id
        name
        currency {
          securityCode
        }
        status
        startDate
      }
    }
  `;
}

export function usePortfoliosByParameters(
  parameters: PortfolioParametersInput = {},
  options: { enabled?: boolean } = {}
) {
  return useQuery({
    queryKey: ['portfolios-by-parameters', parameters],
    queryFn: async () => {
      const query = buildPortfoliosQuery(parameters);
      const data = await client.request<GetPortfoliosByParametersQuery>(query);
      return data.portfoliosByParameters;
    },
    enabled: options.enabled ?? true,
    placeholderData: keepPreviousData,
  });
}
