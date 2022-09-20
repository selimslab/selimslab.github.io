fig, axs = plt.subplots(ncols=2)

sns.boxplot(sorted(scores), ax=axs[0])
sns.boxplot(sorted(errors), ax=axs[1])

sns.lineplot(data=np.cumsum(model_counts["count"]))


plt.matshow(df.corr())
plt.show()

sns.pairplot(df)
