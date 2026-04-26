---
layout: doc
---

# Core concepts

## Sections

The basic building block of Creopse is the section, which can be defined as a contextualized and localized content block. Every section has a data structure for organizing its content and parameters for adapting its rendering.

## Pages

Pages in Creopse are stacks of sections whose position and content can be modified. Each page can contain as many sections as needed, and the content of each section is bound to the page it sits on. The same section can therefore be used across multiple pages with different content, or appear multiple times on the same page. It is also possible to bind a section's content to its content on another page.

![Section / Page relationship](/images/core-concepts/section-page-relation-en-light.svg#light-only)
![Section / Page relationship](/images/core-concepts/section-page-relation-en-dark.svg#dark-only)

## Content models

Content models are data models used to retrieve content tied to the platform's business context, which can be used throughout the application — for example, services, articles, products, etc. They are accessible from any section on any page.

## Data structures

Data structures are descriptions of the shape of the data that makes up the content of various elements such as sections and content models. They allow Creopse to generate the necessary fields for collecting content data in the administration interface.

Two types of components are distinguished in data structures:

- **Singletons**:

Components used to retrieve simple content data, such as a title, an image, a text, etc.

- **Collections**:

Components used to retrieve complex and repetitive content data, such as a list of team members, a list of customer testimonials, etc.

![Singleton vs Collection](/images/core-concepts/singleton-vs-collection-en-light.svg#light-only)
![Singleton vs Collection](/images/core-concepts/singleton-vs-collection-en-dark.svg#dark-only)
