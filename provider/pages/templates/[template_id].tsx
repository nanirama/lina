/**
 * Page used to create and modify note templates.
 */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Editor from "../../components/chart/Editor";
import Alert from "../../components/core/Alert";
import BaseProviderView from "../../components/core/BaseView";
import Button from "../../components/core/Button";
import { createTemplate, getTemplates, updateTemplate } from "../../lib/api";
import useSWR from "swr";

interface Props {
  templateId?: string;
}

const Templates: NextPage<Props> = ({ templateId }) => {
  const router = useRouter();
  const { data, mutate } = useSWR("template_list", getTemplates, {});
  const [templateValue, setTemplateValue] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [alert, setAlert] = useState<React.ReactElement>();

  const templates = data ?? [];

  // If no template is selected, this page is used for creation
  const selectedTemplate = templates.find((t) => `${t.id}` === `${templateId}`);
  const templateInitialValue = selectedTemplate?.value ?? "";
  const selectedTemplateId = selectedTemplate?.id ?? "new";

  useEffect(() => {
    setTemplateName(selectedTemplate?.name || "");
  }, [templates, router]);

  const updateValue = (value: string) => {
    setTemplateValue(value);
  };

  const setError = (err: Error) => {
    setAlert(
      <Alert type="danger" onClose={() => setAlert(undefined)}>
        {err.toString()}
      </Alert>
    );
  };

  const onSubmit = () => {
    const params = { name: templateName, value: templateValue };
    if (!selectedTemplate) {
      createTemplate(params)
        .then((templateId) => router.push(`/templates/${templateId}`))
        .then(() => mutate())
        .catch(setError);
    } else {
      updateTemplate(selectedTemplate.id, params)
        .then(() =>
          setAlert(
            <Alert type="success" onClose={() => setAlert(undefined)}>
              Successfully updated template!
            </Alert>
          )
        )
        .then(() => mutate())
        .catch(setError);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setAlert(undefined);
    router.push(`/templates/${e.target.value}`);
  };
  return (
    <BaseProviderView>
      <div className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Create Templates
      </div>
      <div className="flex flex-col space-y-4">
        <select
          className="rounded text-sm shadow mb-2 p-2 w-64"
          value={selectedTemplateId}
          onChange={onChange}
        >
          <option value="new">Create New Template</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder={"Template Name"}
          value={templateName}
        />
        <div className="bg-white">
          <Editor
            placeholder="Create a template here"
            onUpdate={updateValue}
            initialValue={templateInitialValue}
          />
        </div>
        <Button onClick={onSubmit}>
          {selectedTemplate ? "Save" : "Create"}
        </Button>
        {alert}
      </div>
    </BaseProviderView>
  );
};

Templates.getInitialProps = ({ query }) => {
  const templateId = query.template_id as string;
  return { templateId };
};

export default Templates;
